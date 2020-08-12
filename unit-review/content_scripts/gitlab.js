function create_dom_label(status){
    var reviewLabel = document.createElement('span');
    reviewLabel.setAttribute('class', 'badge badge-success')
    reviewLabel.setAttribute('title', 'Review done')
    var reviewLabelText = document.createTextNode(status);
    reviewLabel.appendChild(reviewLabelText)
    return reviewLabel;
}


function display_commit_status(dom_commit){
    commit_sha = dom_commit.children[0].textContent.replaceAll('\n', '');
    console.log("ckeck commit:" + commit_sha);
    if(localStorage.getItem(commit_sha) == 'OK'){
        console.log("check status for" + commit_sha+ ": OK");
        var containerDiv = document.createElement('div');
        containerDiv.setAttribute('class', 'label label-monospace monospace unit-review-status');
        reviewLabel = create_dom_label("Reviewed");
        containerDiv.appendChild(reviewLabel);
        dom_commit.appendChild(containerDiv);
    } else {
        console.log("check status for" + commit_sha+ ": not reviewed");
        var containerDiv = document.createElement('div');
        containerDiv.setAttribute('class', 'label label-monospace monospace');
        reviewIcon = document.createTextNode("...");
        containerDiv.appendChild(reviewIcon);
        dom_commit.appendChild(containerDiv);
    }
}

function add_review_button(){
    existing_button = document.getElementById("unit-review-ok");
    if(existing_button != null){
        existing_button.hidden = true;
    }
    console.log("hidden");
    var buttonContainer = document.getElementsByClassName("commit-actions ")[0];
    console.log('find the place to put button');
    if (get_commit_status() == "OK"){
        console.log("display label reviewed");
        reviewLabel = create_dom_label("Reviewed");
        buttonContainer.insertBefore(reviewLabel, buttonContainer.children[0]);
    } else {
        console.log("display button");
        var reviewButton = document.createElement("button");
        reviewButton.setAttribute('class', 'btn gl-mr-3 btn-secondary btn-md unit-review-action');
        reviewButton.setAttribute('id', 'unit-review-ok');
        console.log("create button");
        var reviewButtonText = document.createTextNode("Set commit to read");
        reviewButton.appendChild(reviewButtonText);
        console.log("append text button");
        buttonContainer.insertBefore(reviewButton, buttonContainer.children[0]);
        console.log("add button");
    }
}

function get_commit_status(){
    uri = window.location.href;
    commit_full_sha = uri.substring(uri.search("commit_id=")+10);
    return localStorage.getItem(commit_full_sha.substring(0,8));
}


function add_element_in_page(){
    console.log("Load unit-review");
    uri = window.location.href;
    if(uri.search("merge_requests") > -1){
        if(uri.search("commits") > -1){
            /* https://gitlab.com/project/-/merge_requests/1234/commits" */
            console.log("Merge request commits page");
            var zones = document.getElementsByClassName("commit-sha-group");
            /*zones.forEach(commit_zone => display_commit_status(commit_zone)); doesnt works */
            for($i=0;$i<zones.length;$i++){
                display_commit_status(zones[$i]);
            }
        }
        else{
            if(uri.search("commit_id") > -1){
                /* "https://gitlab.com/project/-/merge_requests/1234/diffs?commit_id=4321" */
                console.log("Commit page");
                add_review_button();
                /* Add event listener for review ok */
                const review_ok_button = document.getElementById("unit-review-ok");
                review_ok_button.addEventListener("click", function(){
                    uri = window.location.href;
                    commit_full_sha = uri.substring(uri.search("commit_id=")+10);
                    localStorage.setItem(commit_full_sha.substring(0,8), "OK");
                    add_review_button(); /* replace button by label */
                }, false);
            }

        }

    } else {
        console.log("Not in Merge request page");
    }
}


console.log("start");
setTimeout(function () {
    add_element_in_page();
}, 5500);



