const tableName = 'Paint';
const viewName = 'All';

async function getColorData() {
    console.log("Start fetch data records");
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
                colorId: fields['Color Id'],
                sortOrder: fields.SortOrder,
                colorName: fields['Display name'],
                colorCode: fields['Color number'],
                colorCategory: fields['Color category'],
                colorTemperature: fields['Color temperature'],
                material: fields['Material Display Name'],
                materialVariant: fields.Variant,
                brand: fields['Brand Display Name'],
                productLine: fields['Product line'],
                pigments: fields['Pigments link'],
                singlePigment: fields['Single pigment'],
                series: fields.Series,
                lightfastness: fields['Lightfastness unified'],
                opacity: fields.Opacity,
                staining: fields.Staining,
                granulating: fields.Granulating,
                granulation: fields.Granulation,
                swatchImage: fields.Swatch[0].url,
                obsolete: fields.Obsolete,
            };
            return mappedData;
        });

        allRecords = allRecords.concat(records).sort((a, b) => a.sortOrder - b.sortOrder);
        if (data.offset) {
            offset = data.offset;
            await getColorData();
        } else {
            for (var i = 0; i < allRecords.length; i++) {

                document.querySelector("#swatch-list").innerHTML += `
                <div class="swatch-card" id="${allRecords[i].id}" tabindex="0" onclick="openDetails()">
                <img src=${allRecords[i].swatchImage} alt="" class="color-image">
                <div class="card-text">
                    <div class="card-text-row">
                        <h2 class="color-name">${allRecords[i].colorName || ''}</h2>
                        <p class="color-number">${allRecords[i].colorCode || ''}</p>
                    </div>
                    <div class="card-text-row">
                        <p class="make-name">${allRecords[i].brand || ''}</p>
                        <p class="product-line">${allRecords[i].productLine || ''}</p>
                    </div>
                    <div class="color-details-card" id="${allRecords[i].id}">

                        <div class="color-information-list">
                            <div class="color-information-item" id="opacity">
                                <i class="material-icons color-information-icon"></i>
                                <p class="color-information-tag">${allRecords[i].opacity || ''}</p>
                            </div>
                            <div class="color-information-item" id="staining">
                                <i class="material-icons color-information-icon"></i>
                                <p class="color-information-tag">${allRecords[i].staining || ''}</p>
                            </div>
                            <div class="color-information-item" id="granulation">
                                <i class="material-icons color-information-icon"></i>
                                <p class="color-information-tag">${allRecords[i].granulation || ''}</p>
                            </div>
                            <div class="color-information-item" id="lightfastness">
                                <i class="material-icons color-information-icon"></i>
                                <p class="color-information-tag">${allRecords[i].lightfastness || ''}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;




            }
        }
        console.log("Complete fetch data records");
    } catch (error) {
        console.error("Error in fetching data records:", error);

    }
}
getColorData()
