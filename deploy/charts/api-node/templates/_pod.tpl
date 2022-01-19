{{- define "api-node.pod" -}}
containers:
- name: {{ template "charts.name" . }}
  image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
  imagePullPolicy: {{ .Values.image.pullPolicy }}
  ports:
    - name: {{ .Values.service.portName }}
      containerPort: {{ .Values.service.port }}
      protocol: TCP
  env:
    {{- range $key, $value := .Values.configmapVariables }}
    - name: {{ $key | upper }}
      valueFrom:
        configMapKeyRef:
          name: api-node
          key: {{ $key }}
    {{- end }}
  livenessProbe:
{{ toYaml .Values.livenessProbe | indent 6 }}
  readinessProbe:
{{ toYaml .Values.readinessProbe | indent 6 }}
{{- end }}