export const htmlToText = html => {
    return html
        .replace(/<nav\b[^>]*>.*?<\/nav>/gis, '')
        .replace(/<header\b[^>]*>.*?<\/header>/gis, '')
        .replace(/<footer\b[^>]*>.*?<\/footer>/gis, '')
        .replace(/<aside\b[^>]*>.*?<\/aside>/gis, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/&(nbsp|amp|quot|lt|gt);/g, ' ')
        .trim()
        .replace(/(^\s+|\s+$)/g, '')
}
