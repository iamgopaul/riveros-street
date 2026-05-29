#!/usr/bin/env bash
# Riveros Street — local dev launcher
#
# Usage:  ./run.sh
#
# Surfaces (open in browser):
#   Hub        →  http://localhost:6001
#   Restaurant →  http://eat.localhost:6001
#   Shop       →  http://shop.localhost:6001

set -e

PORT=6001

cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "→ installing dependencies"
  npm install
fi

# Kill any leftover dev server first — multiple servers writing the same build
# dir is what corrupts it. This guarantees a single, clean instance.
lsof -ti:"$PORT" 2>/dev/null | xargs kill -9 2>/dev/null || true
pkill -9 -f "next dev" 2>/dev/null || true
sleep 1

# Build dir is ".next-dev.nosync": kept inside the project (so Node can resolve
# node_modules) but the ".nosync" suffix makes iCloud skip syncing it, which is
# what was corrupting the build on this iCloud-synced Desktop. Cleared each start.
rm -rf .next-dev.nosync

echo "→ starting Next.js on port $PORT"
echo "  hub  → http://localhost:$PORT"
echo "  eat  → http://eat.localhost:$PORT"
echo "  shop → http://shop.localhost:$PORT"
echo

exec npx next dev -p "$PORT"
