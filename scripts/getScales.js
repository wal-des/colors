const tableName = 'Color Scales';
const viewName = 'All scales';

async function getScales() {
    console.log("Start fetch scales");
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

                startColorName: fields['Start color display name'],
                startColorPigments: fields['Start color pigments'],
                startColorImage: fields['Start color swatch']?.[0].url,

                endColorName: fields['End color display name'],
                endColorPigments: fields['End color pigments'],
                endColorImage: fields['End color swatch']?.[0].url,

                scaleImage: fields.ScaleImage?.[0].url,

            };

            return mappedData;
        });



        allRecords = allRecords.concat(records).sort((a, b) => a.sortOrder - b.sortOrder);
        if (data.offset) {
            offset = data.offset;
            await getScales();
        } else {
            for (var i = 0; i < allRecords.length; i++) {
                console.log("Scale " + i);
                document.querySelector("#scale-list").innerHTML += `
                        <div class="scale-outer-card">
                            <img src=${allRecords[i].scaleImage} alt="" class="scale-image" onerror="this.src='../images/no-scale.svg';">
                            <div class="scale-card">
                                <div class="scale-color">
                                    <img src=${allRecords[i].startColorImage} alt="" class="scale-color-image" onerror="this.src='../images/no-swatch-duo.svg';">
                                    <div class="scale-color-text-container">
                                        <p class="scale-color-name">${allRecords[i].startColorName || ''}</p>

                                    </div>
                                </div>
                                <div class="scale-color">
                                    <img src=${allRecords[i].endColorImage} alt="" class="scale-color-image" onerror="this.src='../images/no-swatch-duo.svg';">
                                    <div class="scale-color-text-container">
                                        <p class="scale-color-name">${allRecords[i].endColorName || ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }
            console.log("Finish fetch scales");
        }
        console.log(startColorImage);
    } catch (error) {

    }
}
getScales()
