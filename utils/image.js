export function getFilePath(file) {
    const filePath = file.path
    const fileSplit = filePath.split("\\") //Windows
    //const fileSplit = filePath.split("/") //Lunux ou Mac

    return `${fileSplit[1]}/${fileSplit[2]}`
}