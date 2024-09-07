const tableName = 'Color Scales';
const viewName = 'All scales';

async function getScales() {
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
                startColorImage: 'images/colors/'.concat(fields['Start color code']).concat('.jpg'),

                endColorName: fields['End color display name'],
                endColorPigments: fields['End color pigments'],
                endColorImage: 'images/colors/'.concat(fields['End color code']).concat('.jpg'),

                scaleImage: 'images/color-scales/'.concat(fields['Scale name']).concat('.jpg'),

            };

            return mappedData;
        });



        allRecords = allRecords.concat(records).sort((a, b) => a.sortOrder - b.sortOrder);
        if (data.offset) {
            offset = data.offset;
            await getScales();
        } else {
            for (var i = 0; i < allRecords.length; i++) {

                document.querySelector("#scale-list").innerHTML += `
                        <div class="scale-outer-card">
                            <img src=${allRecords[i].scaleImage} alt="" class="scale-image">
                            <div class="scale-card">
                                <div class="scale-color">
                                    <img src=${allRecords[i].startColorImage} alt="" class="scale-color-image">
                                    <div class="scale-color-text-container">
                                        <p class="scale-color-name">${allRecords[i].startColorName || ''}</p>

                                    </div>
                                </div>
                                <div class="scale-color">
                                    <img src=${allRecords[i].endColorImage} alt="" class="scale-color-image">
                                    <div class="scale-color-text-container">
                                        <p class="scale-color-name">${allRecords[i].endColorName || ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }
        }
        console.log(startColorImage);
    } catch (error) {

    }
}
getScales()
