#!/bin/sh
# Gate: no unfilled kit placeholder remains. SETUP.md names them on purpose.
hits=$(grep -rnE '\{\{[A-Z_]+\}\}' agent-kit --include='*.md' --exclude=SETUP.md --exclude-dir=evidence || true)
if [ -n "$hits" ]; then
  echo "Unfilled kit placeholders:" >&2
  echo "$hits" >&2
  exit 1
fi
