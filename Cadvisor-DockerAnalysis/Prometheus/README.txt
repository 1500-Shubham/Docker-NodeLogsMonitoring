https://docs.techdox.nz/prometheus/

deploys Prometheus in a Docker container, along with a specified configuration file 



Volumes:
./prometheus:/etc/prometheus mounts the local Prometheus configuration directory to the container.

1st mount the local volkume to container Volumes
Command: --config.file=/etc/prometheus/prometheus.yml specifies the configuration file used by Prometheus.

this Command set configuration file which is copied on container now