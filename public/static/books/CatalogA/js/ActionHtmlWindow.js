function ActionHtmlWindow(a){var b=this,c=function(a){var b=a.split(";"),c=b[0]||"";return{oldSrc:c,src:c.replace(/^https?:/,window.location.protocol),width:b[1]||600,height:b[2]||340,title:b[3]||""}},d=function(a,b){document.all?a.style.filter="alpha(opacity="+b+")":a.style.opacity=b/100},e=c(a),f=document.createElement("div"),g=document.createElement("div"),h=document.createElement("div"),i=document.createElement("div"),j=document.createElement("iframe"),k=f.style,l=g.style,m=h.style,n=i.style,o=j.style,p=document.createElement("div"),q=p.style,r=0;""!=e.title&&" "!=e.title&&(i.appendChild(p),r=30),q.height=r,p.innerHTML=e.title,q.lineHeight=r-1+"px",q.fontSize="16px",q.borderBottom="1px solid #c1c1c1",q.paddingLeft="8px";var s=document.createElement("div"),t=s.style;t.position="relative",t.display="block",t.backgroundColor="#fff",t.lineHeight="0px",t.margin="0",t.width="100%",t.maxWidth=e.width+"px",t.height=e.height+"px",k.position="fixed",k.top="0",k.right="0",k.bottom="0",k.left="0",k.zIndex="1040",k.opacity=.5,k.backgroundColor="#000",d(f,50),l.position="fixed",l.top="0",l.right="0",l.bottom="0",l.left="0",l.zIndex="1040",l.padding="0",l.border="none",l.margin="0",l.overflow="auto",n.position="relative",n.display="block",n.backgroundColor="#fff",n.lineHeight="0px",n.margin="0 auto",n.maxWidth="100%",n.width=e.width+"px",n.height=parseInt(e.height)+r+"px",o.position="relative",o.border="none",o.margin="0",o.padding="0",o.left="0px",o.top="0px",j.setAttribute("allowfullscreen", true),j.setAttribute("webkitAllowFullScreen", true),j.setAttribute("mozallowfullscreen", true),j.width="100%",j.height="100%",j.src=e.src,m.position="fixed",m.width="60px",m.height="60px",m.top="0px",m.right="0px",m.overflow="hidden",m.cursor="pointer",h.title="Close",h.innerHTML="<img src='files/extfiles/close_btn.png' style='width:100%;height:100%;'>";var u=new Image;u.onload=function(){h.innerHTML="<img src='files/extfiles/close_btn.png' style='width:100%;height:100%;'>"},u.onerror=function(){h.innerHTML="<img src='../files/extfiles/close_btn.png' style='width:100%;height:100%;'>"},u.src="files/extfiles/close_btn.png",g.appendChild(i),g.appendChild(h),i.appendChild(s),s.appendChild(j);var v=document.getElementsByTagName("body")[0];v.appendChild(f),v.appendChild(g),g.onclick=function(){var a=document.getElementsByTagName("body")[0];a.removeChild(f),a.removeChild(g)},i.onclick=function(a){return a.preventDefault(),!1},h.onclick=function(a){a.stopPropagation(),a.preventDefault();var b=document.getElementsByTagName("body")[0];return b.removeChild(f),b.removeChild(g),window.FlipBookBuilder.onCloseHtml&&window.FlipBookBuilder.onCloseHtml(),!1},setTimeout(function(){b.box=g,b.bg=f},0);var w=function(){var a=window.innerHeight||$(window).height(),b=parseInt(e.height)+r;if(b>=a-20){var c=a-20,d=c-r;n.height=c+"px",t.height=d+"px"}else n.height=b+"px",t.height=e.height+"px";n.marginTop=Math.max(10,(g.clientHeight-(parseInt(e.height)+r))/2)+"px",n.marginBottom=Math.max(10,(g.clientHeight-(parseInt(e.height)+r))/2)+"px"};w(),window.onresize=function(){w()};try{$.ajax({url:e.src,type:"GET",dataType:"jsonp",timeout:3e3,complete:function(a){200==a.status||(j.src=e.oldSrc)}})}catch(e){}}ActionHtmlWindow.prototype={constructor:ActionHtmlWindow,destroy:function(){var a=document.getElementsByTagName("body")[0];a.removeChild(this.bg),a.removeChild(this.box),window.FlipBookBuilder.onCloseHtml&&window.FlipBookBuilder.onCloseHtml()}};