var getRandom = function(min,max){
  const range = max - min;
  const rand = Math.random();
  return (min + Math.round(rand * range));
}

module.exports = {
  getRandom: getRandom
}