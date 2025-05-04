terraform {
  required_version = "1.5.7"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.97.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.7.1"
    }
  }

  backend "s3" {
    bucket  = "terraform-s3-bucket-feature-app"
    key     = "EKS/terraform.tfstate"
    region  = "eu-central-1"
    encrypt = true
  }
}

provider "aws" {
  region = "eu-central-1"
}