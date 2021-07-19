const ImageNameGeneration = arr => {
  const url = 'https://corona-images2.obs.cn-north-4.myhuaweicloud.com/img/'
  arr.forEach((item) => {
    switch (item.roomType) {
      case '主题特色大床房':
        item.imagePath = url + 'ThemeFeatureQueenRoom.jpg'
        break;
      case '温馨大床房':
        item.imagePath = url + 'CozyQueenRoom.jpg'
        break;
      case '如意标准间':
        item.imagePath = url + 'RuyiStandardRoom.jpg'
        break;
      case '豪华大床房':
        item.imagePath = url + 'LuxuriousMaster Bedroom.jpg'
        break;
      case '如意三人房':
        item.imagePath = url + 'RuyiTripleRoom.jpg'
        break;
      case '团圆家庭房':
        item.imagePath = url + 'ReunionFamilyRoom.jpg'
        break;
      case '情侣套房':
        item.imagePath = url + 'CoupleSuite.jpg'
        break;
      case '商务套房':
        item.imagePath = url + 'Businesssuite.jpg'
        break;
    }
  })
  return arr
}

module.exports = {
  ImageNameGeneration
}