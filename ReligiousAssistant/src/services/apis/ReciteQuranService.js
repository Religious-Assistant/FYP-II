
async function getSurahs(){
    const surahs=await fetch('http://api.alquran.cloud/v1/surah')
    const data=await surahs.json()
    return data
}


async function getParahs(){
    const surahs=await fetch('http://api.alquran.cloud/v1/surah')
    const data=await surahs.json()
    return data
}


export {getSurahs, getParahs}