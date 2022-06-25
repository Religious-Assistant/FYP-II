

async function getSurahs(abortSignal){
    const surahs=await fetch('http://api.alquran.cloud/v1/surah', {signal:abortSignal})
    const data=await surahs.json()
    return data
}


async function getParahs(abortSignal){
    const surahs=await fetch('http://api.alquran.cloud/v1/surah', {signal:abortSignal})
    const data=await surahs.json()
    return data
}


export {getSurahs, getParahs}
