//copy string to clipboard
export const copy = (string) =>  {
    navigator.clipboard.writeText(string)
}

//convert ISOstring date to 2020-12-30
export const date = (iso) => {
    let t = new Date(iso)
    t = t.toString().split(" ").slice(1, 4).join(" ")
    return t
}

// save basket to localstorage
export const saveDataToLocalStorage = (unique) => {
    let item = JSON.parse(localStorage.getItem('basket')) || [];
    const index = item.indexOf(item.find(inx => inx.unique === unique))
    item.splice(index, 1)
    localStorage.setItem('basket', JSON.stringify(item));
}