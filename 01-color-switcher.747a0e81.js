const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");let a=null;t.addEventListener("click",(function(d){a=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.setAttribute("disabled","true"),e.disabled=!d.target})),e.addEventListener("click",(function(r){e.setAttribute("disabled","true"),t.disabled=!r.target,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.747a0e81.js.map
