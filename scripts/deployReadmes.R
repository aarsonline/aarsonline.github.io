library(rjson)


# Copies the contents of all readmes into the html to help with indexing. 
# The content will be replaced by the README.md when the page is loaded, so any changes made to README.md will not be indexed unless this script is called again




data.dir = list.dirs(".", recursive=T)
data.dir = data.dir[grep("/data$", data.dir)]
data.dir = gsub("/data", "", data.dir)

for (d in data.dir){

	json = paste0(d, "/info.json")
	readme = paste0(d, "/README.md")
	refs = paste0(d, "/REF.md")	
	index = paste0(d, "/index.html")
	
	
	if (!file.exists(json)){
		cat(paste0("Warning: cannot find ", json, "\n"))
		next
	}
	
	if (!file.exists(readme)){
		cat(paste0("Warning: cannot find ", readme, "\n"))
		next
	}
	
	if (!file.exists(refs)){
		cat(paste0("Warning: cannot find ", refs, "\n"))
		next
	}
	
	if (!file.exists(index)){
		cat(paste0("Warning: cannot find ", index, "\n"))
		next
	}
	
	
	# Read in files
	json = fromJSON(file=json)
	readme.txt = readLines(readme)
	refs.txt = readLines(refs)
	index.txt = readLines(index)
	
	
	# Prepare body string
	comment = "<!-- Content automatically pulled from readme for indexing purposes. This will be overwritten using javascript -->\n"
	heading = paste0("<h1>", json$fullName, "</h1>")
	refheading = paste0("<h2>References</h2>")
	body = paste("<div class='indexMetadata'>", comment, heading, paste(readme.txt, collapse="\n"), refheading, paste(refs.txt, collapse="\n"), "</div>", sep="<br><br>\n\n")
	
	
	# Insert into html
	html.line = grep('id="main"', index.txt) 
	
	if (length(html.line) != 1){
		cat(paste0("Warning: cannot find main in ", index, "\n"))
		next
	}
	
	index.footer = 
	"		</div>
		</body>
	</html>"
	
	index.new = c(index.txt[1:html.line], body, index.footer)
	index.new = paste0(index.new, collapse="\n")
	
	cat(paste0("Adding content to ", index, "\n"))
	write(index.new, index)

}

