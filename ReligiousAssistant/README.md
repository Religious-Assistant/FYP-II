Pre-requisite:
Install JDK>=11, NodeJS>=12, Android SDK, Emulator
Set JAVA_HOME, ANDROID_HOME

Then:

>npx react-native init AwesomeProject
>npx react-native run-android

if required
PASTE org.gradle.jvmargs=--add-opens java.base/java.io=ALL-UNNAMED

Replace distribution URL
distributionUrl=https\://services.gradle.org/distributions/gradle-7.2-all.zip 

YOU MAY need to link resources like icons, fonts after adding into project so run
>npx react-native link