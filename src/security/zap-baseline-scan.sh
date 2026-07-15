#!/bin/bash
mkdir -p reports
docker run --rm -v $(pwd):/zap/wrk:rw \
  -t owasp/zap2docker-weekly \
  zap-baseline.py \
  -t https://serverest.dev \
  -r /zap/wrk/reports/zap-report.html \
  -x /zap/wrk/reports/zap-report.xml

if grep -q "Alta" reports/zap-report.xml; then
  echo "❌ Vulnerabilidades ALTAS encontradas! Interrompendo pipeline."
  exit 1
else
  echo "✅ Scan de segurança concluído sem achados críticos."
  exit 0
fi