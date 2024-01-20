# react-native-bootsplash

## Without license key
yarn react-native generate-bootsplash svgs/light_logo.svg \
  --platforms=android,ios,web \
  --background=F5FCFF \
  --logo-width=100 \
  --assets-output=assets \
  --flavor=main \
  --html=index.html

## With license key 🔑
yarn react-native generate-bootsplash svgs/light_logo.svg \
  --platforms=android,ios,web \
  --background=F5FCFF \
  --logo-width=100 \
  --assets-output=assets \
  --flavor=main \
  --html=index.html \
  --license-key=xxxxx \
  --brand=svgs/light_brand.svg \
  --brand-width=80 \
  --dark-background=00090A \
  --dark-logo=svgs/dark_logo.svg \
  --dark-brand=svgs/dark_brand.svg