/**
 * Function to change "todayScore" to "score"
 * and translate the words in keyData in french version
 * @param {object} data the datas retrieve from call api or dataMocked
 */
export function ChangeUserMainData(data){

    const keyDataMapping = {
        'calorieCount': 'calories',
        'proteinCount': 'proteines',
        'carbohydrateCount':'glucides',
        'lipidCount': 'lipides'
    }
    // Replacing todayScore key with score
    if(data.todayScore){
        data["score"] = data.todayScore
          delete data["todayScore"];
        }

    const updatedKeyData = {};
    for (const key in data.keyData) {
        if (key in keyDataMapping) {
        updatedKeyData[keyDataMapping[key]] = data.keyData[key];
        } else {
        updatedKeyData[key] = data.keyData[key];
        }
    }
    data.keyData = updatedKeyData;
}