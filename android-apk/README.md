# Oboy Android (minimal)

This is a minimal native Android app (Kotlin) scaffold. It produces a simple APK you can install on your Samsung S21.

How to build (Android Studio - recommended):

1. Open Android Studio and choose "Open" then select the `android-apk` folder in this repository.
2. Let Android Studio sync and install any missing SDK components when prompted.
3. Build > Build Bundle(s) / APK(s) > Build APK(s).
4. After a successful build the debug APK will be at `android-apk/app/build/outputs/apk/debug/app-debug.apk`.

How to build (command line):

- Requirements: Java JDK 11+, Android SDK, and Gradle (or use Android Studio which installs Gradle automatically).
- From repository root:

```bash
cd "android-apk"
./gradlew assembleDebug
```

APK location: `app/build/outputs/apk/debug/app-debug.apk`

If you want me to produce the APK for you (build it in cloud via GitHub Actions), I can add a workflow file — tell me and I will scaffold it and explain how to run it.
