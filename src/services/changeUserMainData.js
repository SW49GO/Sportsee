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
        // console.log('model',user.keyData)

    const updatedKeyData = {};
    for (const key in user.keyData) {
        if (key in keyDataMapping) {
        updatedKeyData[keyDataMapping[key]] = user.keyData[key];
        } else {
        updatedKeyData[key] = user.keyData[key];
        }
    }
    user.keyData = updatedKeyData;
        // console.log(user);

}