const comfyuiAddress = "127.0.0.1:8188";

// DOM Elements
const generateBtn = document.getElementById("generate");
const resultImage = document.getElementById("result-image");
const workflowUpload = document.getElementById('workflow-upload');
const dynamicControlsContainer = document.getElementById('dynamic-controls-container');

// Global state
let currentWorkflow = null;

// --- Core API and WebSocket Logic (mostly unchanged) ---

async function queuePrompt(promptWorkflow) {
  const res = await fetch(`http://${comfyuiAddress}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: promptWorkflow }),
  });
  return await res.json();
}

async function getImage(filename, subfolder, type) {
  const res = await fetch(`http://${comfyuiAddress}/view?filename=${filename}&subfolder=${subfolder}&type=${type}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

function setupWebSocket() {
  const ws = new WebSocket(`ws://${comfyuiAddress}/ws`);
  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'executed' && data.data.output.images) {
      const imageInfo = data.data.output.images[0];
      const imageUrl = await getImage(imageInfo.filename, imageInfo.subfolder, imageInfo.type);
      resultImage.src = imageUrl;
      resultImage.style.display = 'block';
      generateBtn.disabled = false;
      generateBtn.innerText = "Generate Image";
    }
  };
   ws.onopen = () => {
    console.log('WebSocket connection established.');
  };
  ws.onerror = (err) => {
    console.error('WebSocket Error: ', err);
  }
}

// --- Dynamic Workflow and UI Generation Logic ---

function createDynamicControls(workflow) {
    dynamicControlsContainer.innerHTML = ''; // Clear previous controls
    Object.values(workflow).forEach(node => {
        if (node.class_type === "CLIPTextEncode") {
            const label = document.createElement('label');
            // Heuristic to determine if it's a positive or negative prompt
            const isPositive = JSON.stringify(node.inputs.text).toLowerCase().includes('masterpiece');
            label.textContent = isPositive ? 'Positive Prompt:' : 'Negative Prompt:';

            const textarea = document.createElement('textarea');
            textarea.id = `node-${node._meta.title}-text`; // Use title if available, fallback needed
            textarea.dataset.nodeId = Object.keys(workflow).find(key => workflow[key] === node); // Find the node's ID
            textarea.dataset.inputName = 'text';
            textarea.value = node.inputs.text;
            
            dynamicControlsContainer.appendChild(label);
            dynamicControlsContainer.appendChild(textarea);
        }
         // Add more control creators here for other node types like KSampler (seed, steps, cfg), etc.
    });
}


workflowUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const workflow = JSON.parse(e.target.result);
            currentWorkflow = workflow;
            createDynamicControls(currentWorkflow);
            generateBtn.style.display = 'block';
        } catch (error) {
            alert('Error parsing workflow file. Please make sure it is a valid JSON file from ComfyUI.');
            console.error(error);
        }
    };
    reader.readAsText(file);
});

generateBtn.addEventListener("click", async () => {
  if (!currentWorkflow) {
    alert("Please upload a workflow file first!");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.innerText = "Generating...";
  resultImage.style.display = 'none';

  // Create a deep copy to avoid modifying the original loaded workflow
  const workflowToQueue = JSON.parse(JSON.stringify(currentWorkflow));

  // Update the workflow with values from the dynamic controls
  const controls = dynamicControlsContainer.querySelectorAll('[data-node-id]');
  controls.forEach(control => {
      const { nodeId, inputName } = control.dataset;
      if(workflowToQueue[nodeId]) {
          workflowToQueue[nodeId].inputs[inputName] = control.value;
      }
  });
  
  await queuePrompt(workflowToQueue);
});

// --- Initial Setup ---
function init() {
    generateBtn.style.display = 'none'; // Hide button until workflow is loaded
    setupWebSocket();
}

init();
