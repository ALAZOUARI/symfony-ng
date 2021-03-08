{{- define "ingress.template" -}}
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: {{ .service.name | quote }}
spec:
  rules:
    - host: {{ .service.host | quote }}
      http:
        paths:
          - path: /
            backend:
              serviceName: {{ .service.name | quote }}
              servicePort: {{ .service.port }}
{{- end -}}