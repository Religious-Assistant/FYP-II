
async function getChapters(abortSignal){
    const surahs=await fetch('https://bhagavadgitaapi.in/chapters', {signal:abortSignal})
    const data=await surahs.json()
    return data
}

export {getChapters}