	var converter = document.createElement("div")
	var library = Object.create({
		add: function(nameOrEle, ele){
			var name
			if (ele){
				name = nameOrEle
			}
			else {
				ele = nameOrEle
			}
			name = ele.id || name // always take the id of the item over it's given name

			if (typeof ele == "string"){
				converter.innerHTML = ele
				Array.prototype.forEach.call(converter.children, function(child){
					library.add(child)
				})
			}

			// we only do this if we have a name and it's not already in use
			else if (name && !library[name]){
				// first thing's first, we move the element's id into it's class if it has one
				if (ele.id){
					var className = ele.className
					ele.className = ele.id
					if (className){
						ele.className += " " + className
					}
					ele.removeAttribute("id")
				}

				Object.defineProperty(library, name, {
					enumerable: false,
					configurable: false,
					writable: false,
					value: ele.cloneNode(true)
				})
			}
			else {
				console.warn("no name declared for element or the name is already in use")
			}
			return library
		},
		clone: function(name){
			if (library[name]){
				return library[name].cloneNode(true)
			}
			else {
				console.warn(name + " not found")
			}
		},
		convert: function(string){
			converter.innerHTML = string
			if (converter.children.length){
				return converter.children[0]
			}
		}
	})

    var templates = {}
    var templateToElement = function(string){
        converter.innerHTML = string
        if (converter.children.length){
            return converter.children[0]
        }
    }

	library.add(`<div id="wrapper"></div>`)
    templates.wrapper = `<div class="wrapper"></div>`

	var domDebugger = templateToElement(templates.wrapper)
	domDebugger.id = "mobile-debug"
	var stylesBlock = templateToElement(`<style></style>`)
	domDebugger.appendChild(stylesBlock)

	Object.defineProperty(domDebugger, "styles", {
		enumerable: false,
		configurable: false,
		get: function(){
			return stylesBlock.innerHTML
		},
		set: function(val){
			stylesBlock.innerHTML = val
			return val
		}
	})

	if (document.body){
		document.body.appendChild(domDebugger)
	}
	else {
		document.addEventListener("readystatechange", function(){
			if (document.readyState === "interactive"){
				document.body.appendChild(domDebugger)
			}
		})
	}

	domDebugger.styles += `
		#mobile-debug {
			border-color: #DDD;
		}
		#mobile-debug * {
			border-color: inherit;
            box-sizing: border-box;
		}
		#mobile-debug input,
		#mobile-debug textarea {
			background-color: transparent;
		}
	`
