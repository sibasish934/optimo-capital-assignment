variable "vpc_cidr_range" {
  description = "this is vpc cidr value"
  type        = string
  default     = "192.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "this is subnet cidr"
  type        = list(string)
}

variable "private_subnet_cidr" {
  description = "this are the subnets cidr of the private subnets"
  type        = list(string)
}

variable "prefix" {
  default = "main"
}

variable "env" {
  default     = "dev"
  description = "this is the dev environment"
}

variable "project" {
  default = "testing-architecture"
}

variable "contact" {
  default = "example@example.com"
}