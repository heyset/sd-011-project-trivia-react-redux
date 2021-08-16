function shuffle(original) {
  let newArray = [];
  const stopAt = -1;
  if (original.length > 2) {
    const arrayLength = 3;
    for (let index = arrayLength, clone = [...original];
      index > stopAt;
      index -= 1) {
      const random = Math.round(Math.random() * index);
      newArray = [...newArray, clone[random]];
      clone = clone.filter((option) => option !== clone[random]);
    }
    return newArray;
  }
  const clone = [...original];
  const random = Math.round(Math.random());
  newArray[0] = clone[random];
  newArray[1] = clone[1 - random];
  return newArray;
}

// shuffle(originalArray) {
//   const array = [...originalArray];
//   let backPileFrontier = array.length - 1;

//   while (backPileFrontier) {
//     const randomIndex = Math.floor(Math.random() * backPileFrontier);
//     const swap = array[backPileFrontier];
//     array[backPileFrontier] = array[randomIndex];
//     array[randomIndex] = swap;

//     backPileFrontier -= 1;
//   }

//   return array;
// } fisher-yates (inacio)

export default shuffle;
