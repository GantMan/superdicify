export function shuffleCombo(array, array2) {
  let counter = array.length
  console.assert(array.length === array2.length)
  let temp, temp2
  let index = 0
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = (Math.random() * counter) | 0
    // Decrease counter by 1
    counter--
    // And swap the last element with it
    temp = array[counter]
    temp2 = array2[counter]
    array[counter] = array[index]
    array2[counter] = array2[index]
    array[index] = temp
    array2[index] = temp2
  }
}

function printSign(val) {
  console.log(`
  ╔════════════╗
  ║   SAVING   ║
  ║   %${(val * 100).toFixed(2)}   ║
  ╚════════════╝
  `)
}

export async function bestValidationSave(model, savePath, best) {
  return {
    onEpochEnd: async (_epoch, logs) => {
      console.log('here', logs.val_acc)
      if (logs.val_acc > best) {
        printSign(logs.val_acc)
        model.save(savePath)
        best = logs.val_acc
      }
    },
  }
}
