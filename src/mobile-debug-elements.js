	library.add(`
		<div id="htmlContainer" class="data-div closed">
			<div class="html-open"></div>
			<div class="html-body">...</div>
			<div class="html-close"></div>
		</div>
	`)

	var createDomHtmlRepresentation = function(ele){
		if (!ele){
			return
		}

		if (ele instanceof HTMLElement){
			var clone = ele.cloneNode()
			var nodeText = clone.outerHTML
			var nodeRepresentation = library.clone("htmlContainer")
			var closingTagMatch = nodeText.match(/<\/[^>]+>/)
			var oppeningTag
			console.log(closingTagMatch)
			if (closingTagMatch){
				var closingTag = closingTagMatch[0]
				oppeningTag = nodeText.replace(closingTag, "")
				nodeRepresentation.querySelector(".html-close").innerText = closingTag
				nodeRepresentation.querySelector(".html-body").innerText = "..."
			}
			else {
				oppeningTag = nodeText
			}
			var childNodes = ele.childNodes
			nodeRepresentation.querySelector(".html-open").innerText = oppeningTag

			var show = function(){
				nodeRepresentation.classname = nodeRepresentation.classname.replace(" closed", "")
			}
			var hide = function(){
				nodeRepresentation.classname = nodeRepresentation.classname.replace(" open", "")
			}

			// debug and testing returns
			return {
				close: closingTag,
				contents: ele.innerHTML,
				open: oppeningTag
			}
		}
		else if (ele instanceof Text){
			systemLog = true;
			return createDomStringRepresentation(ele.nodeValue)
		}

	}

	domDebugger.style += `
		.htmlContainer.closed > * {
			display: inline-block;
		}
	`
