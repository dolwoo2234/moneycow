
const comfyuiAddress = "127.0.0.1:8188";
const generateBtn = document.getElementById("generate");
const promptText = document.getElementById("prompt");
const resultImage = document.getElementById("result-image");
const resultContainer = document.getElementById("result-container");

// A simple text-to-image workflow
const workflow = {
  "3": {
    "class_type": "KSampler",
    "inputs": {
      "seed": 156687112760228,
      "steps": 20,
      "cfg": 8,
      "sampler_name": "euler",
      "scheduler": "normal",
      "denoise": 1,
      "model": [ "4", 0 ],
      "positive": [ "6", 0 ],
      "negative": [ "7", 0 ],
      "latent_image": [ "5", 0 ]
    }
  },
  "4": {
    "class_type": "CheckpointLoaderSimple",
    "inputs": {
      "ckpt_name": "v1-5-pruned-emaonly.safetensors"
    }
  },
  "5": {
    "class_type": "EmptyLatentImage",
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    }
  },
  "6": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "masterpiece, best quality, a beautiful landscape",
      "clip": [ "4", 1 ]
    }
  },
  "7": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
      "clip": [ "4", 1 ]
    }
  },
  "8": {
    "class_type": "VAEDecode",
    "inputs": {
      "samples": [ "3", 0 ],
      "vae": [ "4", 2 ]
    }
  },
  "9": {
    "class_type": "SaveImage",
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [ "8", 0 ]
    }
  }
};


async function queuePrompt(promptWorkflow) {
  const res = await fetch(`http://${comfyuiAddress}/prompt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
      generateBtn.disabled = false;
      generateBtn.innerText = "Generate Image";
    }
  };
}

generateBtn.addEventListener("click", async () => {
  const currentPrompt = promptText.value;
  if (!currentPrompt) {
    alert("Please enter a prompt!");
    return;
  }
  
  // Update the prompt in the workflow
  workflow["6"].inputs.text = currentPrompt;
  
  generateBtn.disabled = true;
  generateBtn.innerText = "Generating...";
  
  await queuePrompt(workflow);
});

// Setup WebSocket on page load
setupWebSocket();
