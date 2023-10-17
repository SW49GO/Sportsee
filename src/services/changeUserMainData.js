/**
 * Function to change "todayScore" to "score"
 * and translate the words in keyData in french version
 * @param {object} user the datas retrieve from call api or dataMocked
 */
export function ChangeUserMainData(user){

    const keyDataMapping = {
        'calorieCount': 'calories',
        'proteinCount': 'proteines',
        'carbohydrateCount':'glucides',
        'lipidCount': 'lipides'
    }

    if(user.todayScore){
        user["score"] = user.todayScore
          delete user["todayScore"];
        }

    const updatedKeyData = {};
    for (const key in user.keyData) {
        if (key in keyDataMapping) {
        updatedKeyData[keyDataMapping[key]] = user.keyData[key];
        } else {
        updatedKeyData[key] = user.keyData[key];
        }
    }
    user.keyData = updatedKeyData;
}