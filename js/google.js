let autoComplete = [
    {id: 0, field: "Food is nutritious"},
    {id: 0, field: "Food can be so vital for life"},
    {id: 0, field: "Zebra eat grass"},
    {id: 0, field: "Elephant drinks water and eat grass"},
    {id: 1, field: "Eating is good for human, animal and plants"},
];
document.getElementById('searchResult').classList.add('display-none');

let OUTPUT = [];
function dataFetcher() {
    fetch('../js/autoComplete.json')
        .then(resp => resp.json())
        .then((packageJson) => {
            console.log(packageJson.version);
        });
}

(function () {
    console.info('Immediately Invoke function expression');
    console.log('JSON ', autoComplete);
    // dataFetcher(); // Json has to be on HTTP/HTTPS scheme to allow for fetching.
    const searchBar = document.getElementById('searchWithAutoComplete');
    console.log('Search Bar ', searchBar);
    searchBar.addEventListener('keyup', function(e){
        document.getElementById('searchResult').classList.add('display-block');
        document.getElementById('searchResult').classList.remove('display-none');

        performSearch();
        addToDictionary()
        // checkOtherWords(e);
    })
})();

function performSearch() {
    const input = document.getElementById('searchWithAutoComplete').value;
    console.log('Input ', input);
    if(!input) {
        clearInitialRecord();

        document.getElementById('searchResult').classList.remove('display-block');
        document.getElementById('searchResult').classList.add('display-none');

        return false;
    }
    clearInitialRecord();
    let newOutput = autoComplete.filter((data) => {


        return data.field.toLowerCase().includes(input.toLowerCase().trim()) || flipAutoComplete(data.field, input);
    });

   OUTPUT = newOutput;
    // console.log('Output 1', newOutput);
    const outp = OUTPUT.reverse();
    outp.length = outp.length > 10 ? outp.length = 10 : outp.length;
    console.log('Out Put', outp);
    for(let filter of outp){
        console.log('Filter', filter);
        computeHTML(filter.field, input);
    }


}
function clearInitialRecord() {
    document.getElementById('outputField').innerHTML = '';
    OUTPUT = [];

}
function checkOtherWords(e) {

        const input = document.getElementById('searchWithAutoComplete').value;
        let newOutput = [];

        if(e.code == "Space" || e.key == ' '){
            const arr = input.toLowerCase().split(' ');
            arr.splice(0, 1);
 for(let word of arr) {
        if(!word) {
            return false;
        }
        newOutput = autoComplete.filter((data) => {
            return data.field.toLowerCase().includes(word.toLowerCase().trim());
        });
        for(let i = 0; i < newOutput.length; i++) {
            OUTPUT.push(newOutput[i]);
        }
    }
        }
    console.log('Output 2', newOutput, OUTPUT);

}
function computeHTML(value, input) {
    console.log(value, input);
    const node = document.createElement("LI");
    /*make the matching letters bold:*/
    node.innerHTML = "<strong>" + value.substr(0, input.length) + "</strong>";
    node.innerHTML += value.substr(input.length);
   let t =  document.getElementById('outputField').appendChild(node);
}

function flipAutoComplete(autoCompleteText, input) {
    console.log('Hello worjed', autoCompleteText.toLowerCase().split(' ').reverse().join(' ').includes(input.toLowerCase().trim()));
    return autoCompleteText.toLowerCase().split(' ').reverse().join(' ').includes(input.toLowerCase().trim());
}

function addToDictionary() {
    const searchBar = document.getElementById('searchWithAutoComplete').value;
    if(searchBar) {
        const index = autoComplete.length;
        autoComplete.push({id: index, field: searchBar});
    }
}