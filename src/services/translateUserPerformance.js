/**
 * Function to translate english in french
 * @param {object} user 
 */
export function TranslateUserPerformance(user){
    // console.log('TRANSLATEuser:', user)
    const kindMapping = {
        'cardio': 'cardio',
        'energy': 'énergie',
        'endurance': 'endurance',
        'strength': 'force',
        'speed': 'vitesse',
        'intensity': 'intensité'
      };
  
      for (const key in user.kind) {
        if (user.kind.hasOwnProperty(key)) {
          const originalValue = user.kind[key];
          if (kindMapping[originalValue]) {
            user.kind[key] = kindMapping[originalValue];
          }
        }
      }
  
  }