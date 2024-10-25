const tableName = 'Color schemes';
const viewName = 'Main table';

async function getSchemes() {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?view=${viewName}&offset=${offset}`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });
        const data = await response.json();
        const records = data.records.map(record => {
            const fields = record.fields;
            const mappedData = {
                id: record.id,

                yellowOption: fields['Yellow option'],
                yellowName: fields['Yellow Display Name'],
                yellowPigment: fields['Yellow Pigments'],
                yellowImage: fields['Yellow Swatch']?.[0].url,

                redOption: fields['Red option'],
                redName: fields['Red Display Name'],
                redPigment: fields['Red Pigments'],
                redImage: fields['Red Swatch']?.[0].url,

                blueOption: fields['Blue option'],
                blueName: fields['Blue Display Name'],
                bluePigment: fields['Blue Pigments'],
                blueImage: fields['Blue Swatch']?.[0].url,

                triadImage: fields['TriadImage']?.[0].url,

            };
            return mappedData;
        });

        allRecords = allRecords.concat(records).sort((a, b) => a.sortOrder - b.sortOrder);
        if (data.offset) {
            offset = data.offset;
            await getSchemes();
        } else {
            for (var i = 0; i < allRecords.length; i++) {

                document.querySelector("#triad-list").innerHTML += `
                        <div class="triad-outer-card">
                            <img src=${allRecords[i].triadImage} alt="" class="triad-image" onerror="this.src='../images-default/no-scheme.svg';">
                            <div class="triad-card">
                                <div class="triad-color">
                                    <img src=${allRecords[i].yellowImage} alt="" class="triad-color-image" onerror="this.src='../images-default/no-swatch-trio.svg';">
                                    <div class="triad-color-text-container">
                                        <p class="triad-color-name">${allRecords[i].yellowName || ''}</p>
                                    </div>
                                </div>
                                <div class="triad-color">
                                    <img src=${allRecords[i].redImage} alt="" class="triad-color-image" onerror="this.src='../images-default/no-swatch-trio.svg';">
                                    <div class="triad-color-text-container">
                                        <p class="triad-color-name">${allRecords[i].redName || ''}</p>
                                    </div>
                                </div>
                                <div class="triad-color">
                                    <img src=${allRecords[i].blueImage} alt="" class="triad-color-image" onerror="this.src='../images-default/no-swatch-trio.svg';">
                                    <div class="triad-color-text-container">
                                        <p class="triad-color-name">${allRecords[i].blueName || ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }
        }
    } catch (error) {

    }
}
getSchemes()
