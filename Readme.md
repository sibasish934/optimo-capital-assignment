# OPTIMO CAPITAL ASSIGNMENT:- 

1. I have been given one application comprising of frontend and backend. 

Backend:- Python, FAST API, and uvicorn 

Frontend:- Next JS

As per the assignment I have 

1. Dockerize the application tested the application in local environment. 

Docker file for Backend:- 

```Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Install uv
RUN pip install uv

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies using uv
COPY requirements.txt .
RUN uv pip install --system -r requirements.txt

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]


```

Process I followd to generate the requirement.txt file for installing all the dependencies. 

```python

pip freeze > requirment.txt. 

```
But I was getting issue in generating the requirement.txt, then I see the pyproject.toml file where I get the complete dependencies required for the application to work. Then I add the dependencies to the requirement.txt file and then build the docker image out of it. 

Process to build and test the images in the local env. 

```shell
# backend
docker build --no-cache -t feature-app-backend:v1 .
docker run -it -d -p 8000:8000 feature-app-backend:v1 

#frontend
docker build --no-cache -t features-app-frontend:v1 .
docker run -it -d -p 3000:3000 feature-app-frontend:v1

```

--no-cache:- it is used to avoid any build cache for the concurrent build taking place.

![Building the backend images and running the container](images/docker-build-and-run.png) 

![Accessing the application from brower](images/backend-application-browser-output.png)

![accessing the logs of the container](images/backend-container-logs.png)

Similarily building and testing the frontend application. 

Process to build and test the images in the local env. 

```shell
# backend
docker build --no-cache -t feature-app-backend:v1 .
docker run -it -d -p 8000:8000 feature-app-backend:v1 

#frontend
docker build --no-cache -t features-app-frontend:v1 .
docker run -it -d -p 3000:3000 feature-app-frontend:v1

# . :- represents the path to the dockerfile of the application. As in this case the dockerfile is in root directory hence I have mentioned dot. 

```

Dockerfile for Frontend:- 

```Dockerfile

# Use an official Python runtime as a parent image
FROM node:22-alpine 

# Set the working directory in the container to /app
WORKDIR /app

# Copying the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
# Using --legacy-peer-deps to avoid peer dependency issues
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# Using npm run dev to start the development server
CMD ["npm", "run", "dev"]

```

![Building the docker images for Frontend app](images/frontend-build-and-run.png)

![Accessing the application from browser](images/features-app-frontend-image.png)

![Logs of the frontend container](images/frontend-container-logs.png)

Database configuration made by the application are:- 

![tables are created in the application](images/database-tables-created.png)

With the Dockerizing of the application is complete and now I am moving with the terraform part to create the complete infrastructure over the AWS cloud. 

The Terraform Code can be found in the Terraform directory. 

Please find the images of the Infrastructure created by terraform over AWS cloud. 

![terraform init command logs](images/Terraform-Initialization.png)

![terraform backend configuration](images/Terraform-backend-init.png)

![terraform Plan Commands](images/terraform-plan-1.png)

![terraform Plan Commands](images/terraform-plan-2.png)

![terraform Plan Commands](images/terraform-plan-2.png)

![terraform Plan Commands](images/terraform-plan-3.png)

![terraform Plan Commands](images/terraform-plan-4.png)

![Terraform apply command logs](images/terraform-apply-1.png)

![Terraform apply command logs](images/terraform-apply-2.png)

![terraform apply RDS issue](images/Terraform-apply-rds-issue.png)

![terraform RDS issue resolved](images/Terraform-issue-resolved.png)

![terraform configuration validation](images/Terraform-Validate.png)

AWS Resources created by the terraform Code are:- 

VPC created by terraform along with Nat gateway, IGW, public and private subnets:- 

![VPC created by terraform along with Nat gateway, IGW, public and private subnets](images/VPC-created-by-terraform.png)

PostgresSQL database created using Terraform:- 

![RDS created using Terraform](images/Database-created-by-terraform.png)

Database Subnet Group created by terraform:- 

![Database subnet group](images/db-subnet-group-created-by-terraform.png)

EKS cluster created using Terraform:- 

![EKS Cluster](images/EKS-cluster-created-terraform.png)

EKS node group created by terraform :- 

![EKS node group](images/Nodes-created-by-terraform.png)

IAM Role created for the EKS cluster by terraform:- 

![EKS IAM role](images/IAM-EKS-role-created-by-terraform.png)

Remote State Management for managing the terraform tf.state file in the remote backend. 

![Remote Backend](images/Remote-state-management.png)

Secret Manager Created to store the RDS Password using Terraform:- 

![Secret Manager](images/Secret-manager-created-by-terraform.png)

Security groups created using Terraform for RDS and EKS :- 

![security groups](images/Security-Group-created-by-terraform.png)

Accessing the EKS cluster created using Terraform:- 

![EKS cluster access](images/EKS-cluster-access.png)


Next Stage is Installing AWS load Balancer controller in the EKS cluster along with Argo CD for Continuous Deployment. 

Steps of Installing the AWS load Balancer Controller in the cluster is as follows:- 

1. Creating the Policy and AWS Load balancer Role:- 

![Creating Policy](images/AWS-loadbalancer-Policy.png)

![Creating Role](images/AWS-load-Balancer-role.png)

```shell

# use this shell command to install the AWS Loadbalancer Controller in EKS cluster. 
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=my-cluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller
```

![aws-load-balancer-controller-logs](images/AWS-load-Balancer-Controller.png)


* Installing Sealed Secrets in the EKS cluster. 

As we know that the secret in the kubernetes cluster is base64 encoded therefore in order to encrypt the secrets we can use any remote secret manager or we can move with sealed secrets that seal the secrets in the kubernetes cluster using the kubernetes certs. 

Steps to install the sealed secrets in the cluster. 

```shell

kubectl create ns sealed-secrets 

helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets

helm install sealed-secrets -n sealed-secrets --set-string fullnameOverride=sealed-secrets-controller sealed-secrets/sealed-secrets

```

![sealed-secret-proof](images/sealed-secret-install.png)

![sealed-secret-proof-1](images/sealed-secret-1.png)

Steps to install Argo CD in the Cluster in order to setup the CD part. 

use this steps to install argocd in the kubernetes cluster and then access the argocd ui from the browser. 

```shell

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml 

kubectl get all -n argocd

kubectl edit svc/argocd-server -n argocd # this will open the argocd serverice file then change the type of the service to loadbalancer. 

```
![argocd-install](images/argocd-install.png)

![argocd-install-sucessfull](images/argocd-install-successfull.png)

![argocd-server-patching](images/argocd-server-patching.png)

![argocd-ui](images/argocd-ui.png)

After installing Argocd into the server we have now everything in place and we are set to deploy the application into the kubernetes cluster. 

But before that we need to check the connection status from the EKS cluster to our RDS instance in order to verify that the RDS can connect to the EKS cluster. 

For this I have created a test pod in kubernetes cluster and installed telnet in it and check the connectivity of the RDS instance with the EKS cluster. 

```shell 

kubectl run nginx --image=nginx # command to run a test pod nginx with nginx image. 

kubectl exec -it nginx -- /bin/bash # used to execute and exec into the nginx test pod and then you can install telnet in it and check the connection with the database created using terraform 

```

![test-connection-with-rds](images/test-pod-rds-connection-check.png)

Now it time for the deploying the application in the EKS cluster.

before this we have create the required database in the RDS database instance 

![database-creation-in-rds](images/database-creation-in-rds.png)

for Backend:- 

```yaml

# deployment.yaml 

apiVersion: apps/v1
kind: Deployment
metadata:
  name: feature-app-backend-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: feature-app-backend
  template:
    metadata:
      labels:
        app: feature-app-backend
    spec:
      containers:
      - name: feature-app-backend-container
        image: sibasish934/feature-app-backend:v1
        ports:
        - containerPort: 8000
        envFrom:
        - secretRef:
            name: feature-backend-app-secret

# service.yaml 

apiVersion: v1
kind: Service
metadata:
  name: feature-backend-svc
spec:
  type: ClusterIP
  selector:
    app: feature-app-backend
  ports:
  - name: http
    port: 8000
    targetPort: 8000

```

Similary you can find the deployment.yaml and svc.yaml in the inside deploy folder inside frontend directory. 

1. Manual deployment:- Firstly I have manually deployed the application in order to test whether the aplication are running fine or not.  

The following procedure are followed to deploy the applications manually. 

```shell

# backend:- 

kubectl apply -f secret.yaml #==> sealed Secret is used to store the NEXT_PUBLIC_API_URL value but these value are encode values

kubectl delete -f secret.yaml

kubeseal --controller-name=sealed-secrets-controller --controller-namespace=sealed-secrets --format=yaml < secret.yaml > sealed-secret.yaml # then used to command to apply sealed secret the secret.yaml file. 

kubectl apply -f sealed-secret.yaml

kubectl apply -f deploy/deployment.yaml
kubectl apply -f deploy/svc.yaml

# Frontend:- 

kubectl apply -f configmap.yaml # configmap is used to store the backend url 

kubectl apply -f deploy/deployment.yaml
kubectl apply -f deploy/svc.yaml

# After we need to veriy the logs of the svc and pods

kubectl log -f svc/feature-frontend-svc
kubectl log -f svc/feature-backend-svc

# As the logs are fine and we no error hence we can now set up the ingress by 

kubectl apply -f frontend-ingress.yaml 
kubectl apply -f backend-ingress.yaml 

```
![deployment-and-svc](images/deployment-and-svc.png)

Ingress Proof 

![ingress-proof](images/Ingress.png)

Accessing the Application from the browser to test the applications. 

![frontend](images/frontend.png)

![backend](images/backend.png)

Monitoring Proof:- 

![monitoring-backend](images/Monitoring-1.png)

Logs from Grafana dashboard:- 

![backend-logs](images/logs-backend.png)
![frontend-logs](images/logs-frontend.png)

Note:- I have also setup the route53 domain hosted zone in order register the domain for the frontend and backend application repectivily. 

Route 53 Hosted Zone:- 

![route53](images/route53.png)

Loadbalancer and target Groups created for the frontend and backend Application repectivily using the ALB controller. 

![loadbalancercreated](images/load-balancer.png)

![listenerscreated](images/listener-created.png)

With this the deploying of the application is completed and also the application logs are fine and at the same time application are accessible by the browser. 

CI/CD part:- 

In order to carry out the github actions pipelines first you need to do some settings:- 

1. GO to repo settings -> actions -> scroll down to workflows permission -> change the workflow permission to Read and write permission

2. Docker password and Docker username are critical values hence we cannot pass it directly so we have store it in secrets. 

to do that:- come to repo settings -> secrets and variables -> actions -> created the new repo secret. 

![workflow_settings](images/workflow-settings.png)

![secret_settings](images/secrets.png)

Now we will testing the github actions as our ci part:- 

Note:- the github/workflows/main.yaml is present in the .github directory inside every folder. 

Github Actions Proof:- 

![github-actions](images/github-workflows.png)

Github Actions Workflows logs 

![github-actions-logs](images/github-workflows-logs.png)

Github Actions Bot pushed the changes to the code base after all other setups are completed. 

![github-actions-bot](images/github_actions_bot.png)

Similary we have the github workflows setup for the backend applications. 

COntinous Deployment Part can be done using the argocd because it helps in automatic rollout and rollback mechanism in case any outrage. 

please find the snips of the same attached below:- 

![argocd-out-of-sync](images/argocd-out-of-sync.png)

Let us push some changes to github repo to see the ci/cd in actions:- 

update-repo svc.yaml 

![update-repo](images/updated-repo.png)

it should automatically trigger the workflow:- 

![workflow-triggered](images/automatic-workflows.png)

Docker image is successfully tagged and pushed to the docker hub 

![docker_hub_image_updated](images/docker-image-pushed.png)

Workflow is successfully completed. 

![workflow-complete](images/automatic-workflow-complete.png)

When the workflow is complete, it will trigger the Argocd for the deployment. Then ArgoCD will be out-sync ==> process the deployment ==> updated the deployment to new revision. 

![argocd-processing](images/automatic-rollout.png)

![argocd-complete](images/automatic-rollout-complete.png)

with these the complete CI/CD process is complete. This approach is using GitOPS methology which dynamic and self healing which is reponsible in maintainig the HA of our application. 












