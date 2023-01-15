const onsubmit = (e) => {
  e.preventDefault();
  const prompt = document.querySelector("#prompt").value;
  // const size = document.querySelector("#size").value;
  const size = "small";
  const count = document.querySelector("#count").value;

  showload();
  if (prompt === "") {
    alert("enter something");
    return;
  }
  generateImageRequest(prompt, size, count);
  document.getElementById("more_img_area").innerHTML = "";
};

async function generateImageRequest(prompt, size, count) {
  try {
    rmload();
    const res = await fetch("/openai/generateImage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
        count,
      }),
    });

    if (!res.ok) {
      throw new Error("img not gen");
    }
    const data = await res.json();
    const moreImg = data.more;
    moreImg.forEach((e, i) => {
      var img = document.createElement("img");
      img.src = e.url;
      document.getElementById("more_img_area").appendChild(img);
    });
  } catch (error) {
    console.log("error is on");
  }
}

function showload() {
  document.querySelector(".loader").classList.add("show");
}

function rmload() {
  document.querySelector(".loader").classList.remove("show");
}

document.querySelector("#form_data").addEventListener("submit", onsubmit);
