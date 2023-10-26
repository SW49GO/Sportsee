/**
 * Function to translate English in French
 * @param {object} data 
 */
export function TranslateUserPerformance(data){
  const kindMapping = {
      'cardio': 'cardio',
      'energy': 'énergie',
      'endurance': 'endurance',
      'strength': 'force',
      'speed': 'vitesse',
      'intensity': 'intensité'
    };
// Replace the value of each key of data.kind by corresponding value of key kindMapping
    for (const key in data.kind) {
      if (data.kind.hasOwnProperty(key)) {
        const originalValue = data.kind[key]
        if (kindMapping[originalValue]) {
          data.kind[key] = kindMapping[originalValue]
        }
      }
    }
}