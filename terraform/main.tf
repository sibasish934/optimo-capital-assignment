#vpc
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "feature-extraction-vpc-${var.env}"
  cidr = var.vpc_cidr_range

  azs                     = data.aws_availability_zones.azs.names
  public_subnets          = var.public_subnet_cidr
  private_subnets         = var.private_subnet_cidr
  map_public_ip_on_launch = true

  enable_dns_support   = true
  enable_dns_hostnames = true
  enable_nat_gateway   = true
  single_nat_gateway   = true

  tags = {
    "kubernetes.io/cluster/feature-app-cluster-${var.env}" = "shared"
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/feature-app-cluster-${var.env}" = "shared"
    "kubernetes.io/role/elb"               = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/feature-app-cluster-${var.env}" = "shared"
    "kubernetes.io/role/internal-elb"      = 1
  }

}

module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "feature-app-cluster-${var.env}"
  cluster_version = "1.31"

  cluster_endpoint_public_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    nodes = {
      min_size     = 1
      max_size     = 3
      desired_size = 2

      instance_type = ["t3.medium"]
    }
  }

  tags = merge(
    local.common_tags,
    tomap(
      {
        "Name" = "${var.prefix}-postgres"
    })
  )
}

resource "aws_security_group" "rds_sg" {
  description = "RDS security group"
  name        = "${var.prefix}-rds-${var.env}-sg"
  vpc_id      = module.vpc.vpc_id
  ingress {
    protocol    = "tcp"
    from_port   = 5432
    to_port     = 5432
    cidr_blocks = [var.vpc_cidr_range]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, tomap({ Name = "${var.prefix}-rds-${var.env}-sg" }))
}

resource "random_password" "rds_password" {
  length  = 16
  special = false
}

resource "aws_secretsmanager_secret" "rds_password" {
  name = "${var.prefix}-rds-password"
}

resource "aws_secretsmanager_secret_version" "rds_password" {
  secret_id     = aws_secretsmanager_secret.rds_password.id
  secret_string = jsonencode({ password = random_password.rds_password.result })
}

resource "aws_db_instance" "postgres" {
  identifier             = "${var.prefix}-postgres"
  engine                 = "postgres"
  engine_version         = "17.2"
  instance_class         = "db.t4g.micro"
  allocated_storage      = 30
  username               = "postgres"
  password               = random_password.rds_password.result
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  skip_final_snapshot    = true

  tags = merge(
    local.common_tags,
    tomap(
      {
        "Name" = "${var.prefix}-postgres"
    })
  )

}

resource "aws_db_subnet_group" "main" {
  name       = "${var.prefix}-db-subnet-group"
  subnet_ids = module.vpc.private_subnets

  tags = merge(
    local.common_tags,
    tomap({
      Name = "${var.prefix}-db-subnet-group"
    })
  )
}
