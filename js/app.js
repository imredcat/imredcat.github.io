$body = document.getElementsByTagName('body')[0];
fetch("pagelists.json")
    .then(response => response.json())
    .then(json => {result = json}).then(() => {
        $papgelists = document.createElement('div');
        $papgelists.id = 'pagelists';
        $body.appendChild($papgelists);

        for (let i = 0; i < result.length; i++) {
            let link = document.createElement('a');
            link.href = result[i].url;
            link.innerText = result[i].name;
            link.className = 'page-link';
            $papgelists.appendChild(link);
        }
    });