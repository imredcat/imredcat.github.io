#!/usr/bin/env bash
set -euo pipefail

VERSION="0.2.16"
DMG_URL="https://imredcat.github.io/typomm/downloads/Typomm_${VERSION}_aarch64.dmg"
TMP_DMG="$(mktemp -t typomm_install.XXXXXX).dmg"
MOUNT_POINT="/Volumes/Typomm"

cleanup() {
  if [ -d "${MOUNT_POINT}" ]; then
    hdiutil detach "${MOUNT_POINT}" -quiet 2>/dev/null || true
  fi
  rm -f "${TMP_DMG}"
}
trap cleanup EXIT

echo "Typomm v${VERSION} macOS 설치/업그레이드를 시작합니다..."
echo "다운로드 중: ${DMG_URL}"
curl -fsSL "${DMG_URL}" -o "${TMP_DMG}"

echo "디스크 이미지 마운트 중..."
hdiutil attach "${TMP_DMG}" -nobrowse -quiet -mountpoint "${MOUNT_POINT}"

if [ ! -d "${MOUNT_POINT}/Typomm.app" ]; then
  echo "오류: 마운트된 이미지에서 Typomm.app을 찾을 수 없습니다." >&2
  exit 1
fi

echo "/Applications/Typomm.app 설치 중..."
rm -rf /Applications/Typomm.app
ditto "${MOUNT_POINT}/Typomm.app" /Applications/Typomm.app

echo "macOS 격리(quarantine) 속성 제거 및 서명 검증 중..."
xattr -cr /Applications/Typomm.app
codesign --verify --deep --strict /Applications/Typomm.app

INSTALLED_VER="$(defaults read /Applications/Typomm.app/Contents/Info.plist CFBundleShortVersionString)"
echo "Typomm v${INSTALLED_VER} 설치가 완료되었습니다! (/Applications/Typomm.app)"
