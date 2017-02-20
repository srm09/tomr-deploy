FROM openjdk:8

COPY TomR-0.0.1-SNAPSHOT-jar-with-dependencies.jar /tmp/TomR.jar
COPY tomr.config /tmp/tomr.config
ENV TOMR_PROPS=/tmp/

EXPOSE 5000 5001 5002 5003

CMD ["java", "-cp" ,"/tmp/TomR.jar", "edu.tomr.start.NodeStarter"]
