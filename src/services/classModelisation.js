/**
 * Class to make change in datas call from Api or dataMocked
 */
export class Modelisation {
    constructor() {
        this.keyDataMapping = {
            'calorieCount': 'calories',
            'proteinCount': 'proteines',
            'carbohydrateCount': 'glucides',
            'lipidCount': 'lipides'
        }

        this.kindMapping = {
            'cardio': 'cardio',
            'energy': 'énergie',
            'endurance': 'endurance',
            'strength': 'force',
            'speed': 'vitesse',
            'intensity': 'intensité'
        }
    }

    changeUserMainData(data) {
         // Replace todayScore key with score
        if (data.todayScore) {
            data["score"] = data.todayScore
            delete data["todayScore"]
        }

        const updatedKeyData = {}
        // Replace the value of each key of data.keyData by corresponding value of key keyDataMapping
        for (const key in data.keyData) {
            if (key in this.keyDataMapping) {
                updatedKeyData[this.keyDataMapping[key]] = data.keyData[key]
            } else {
                updatedKeyData[key] = data.keyData[key]
            }
        }
        data.keyData = updatedKeyData
    }

    translateUserPerformance(data) {
        // Replace the value of each key of data.kind by corresponding value of key kindMapping
        for (const key in data.kind) {
            if (data.kind.hasOwnProperty(key)) {
                const originalValue = data.kind[key]
                if (this.kindMapping[originalValue]) {
                    data.kind[key] = this.kindMapping[originalValue]
                }
            }
        }
    }
}