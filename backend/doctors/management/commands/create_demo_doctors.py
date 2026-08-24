from django.core.management.base import BaseCommand
from django.db import transaction
from datetime import time

from accounts.models import User
from doctors.models import DoctorProfile, DoctorAvailability


class Command(BaseCommand):

    help = "Create 100 demo doctors with profiles and availability"

    def handle(self, *args, **kwargs):

        doctors_data = [

            # ---------------- CARDIOLOGY ----------------

            {
                "first_name": "Priya",
                "last_name": "Sharma",
                "specialization": "Cardiology",
                "qualification": "MBBS, MD Cardiology",
                "experience": 15,
                "fee": 800,
                "hospital": "City Heart Hospital",
            },

            {
                "first_name": "Amit",
                "last_name": "Kulkarni",
                "specialization": "Cardiology",
                "qualification": "MBBS, DM Cardiology",
                "experience": 18,
                "fee": 1000,
                "hospital": "Ruby Heart Care",
            },

            {
                "first_name": "Neha",
                "last_name": "Patil",
                "specialization": "Cardiology",
                "qualification": "MBBS, MD Cardiology",
                "experience": 11,
                "fee": 700,
                "hospital": "MediCare Hospital",
            },

            {
                "first_name": "Rahul",
                "last_name": "Deshmukh",
                "specialization": "Cardiology",
                "qualification": "MBBS, DM Cardiology",
                "experience": 20,
                "fee": 1200,
                "hospital": "Apollo Care Hospital",
            },

            {
                "first_name": "Snehal",
                "last_name": "Joshi",
                "specialization": "Cardiology",
                "qualification": "MBBS, MD",
                "experience": 9,
                "fee": 600,
                "hospital": "Sunrise Hospital",
            },


            # ---------------- NEUROLOGY ----------------

            {
                "first_name": "Rahul",
                "last_name": "Verma",
                "specialization": "Neurology",
                "qualification": "MBBS, MD Neurology",
                "experience": 12,
                "fee": 900,
                "hospital": "NeuroCare Hospital",
            },

            {
                "first_name": "Anjali",
                "last_name": "Mehta",
                "specialization": "Neurology",
                "qualification": "MBBS, DM Neurology",
                "experience": 16,
                "fee": 1100,
                "hospital": "Brain Health Centre",
            },

            {
                "first_name": "Vikram",
                "last_name": "Singh",
                "specialization": "Neurology",
                "qualification": "MBBS, MD",
                "experience": 14,
                "fee": 850,
                "hospital": "Metro Hospital",
            },

            {
                "first_name": "Kiran",
                "last_name": "Reddy",
                "specialization": "Neurology",
                "qualification": "MBBS, DM Neurology",
                "experience": 19,
                "fee": 1200,
                "hospital": "Apollo Medical Centre",
            },

            {
                "first_name": "Sanjay",
                "last_name": "Pawar",
                "specialization": "Neurology",
                "qualification": "MBBS, MD Neurology",
                "experience": 10,
                "fee": 750,
                "hospital": "LifeCare Hospital",
            },


            # ---------------- ORTHOPEDIC ----------------

            {
                "first_name": "Rohit",
                "last_name": "Patel",
                "specialization": "Orthopedic",
                "qualification": "MBBS, MS Orthopedics",
                "experience": 14,
                "fee": 800,
                "hospital": "Bone & Joint Hospital",
            },

            {
                "first_name": "Meena",
                "last_name": "Shinde",
                "specialization": "Orthopedic",
                "qualification": "MBBS, MS Orthopedics",
                "experience": 12,
                "fee": 700,
                "hospital": "City Orthopedic Centre",
            },

            {
                "first_name": "Raj",
                "last_name": "Malhotra",
                "specialization": "Orthopedic",
                "qualification": "MBBS, DNB Orthopedics",
                "experience": 17,
                "fee": 950,
                "hospital": "Fortis Care",
            },

            {
                "first_name": "Pooja",
                "last_name": "Nair",
                "specialization": "Orthopedic",
                "qualification": "MBBS, MS",
                "experience": 9,
                "fee": 650,
                "hospital": "HealthPlus Hospital",
            },

            {
                "first_name": "Suresh",
                "last_name": "Jadhav",
                "specialization": "Orthopedic",
                "qualification": "MBBS, MS Orthopedics",
                "experience": 21,
                "fee": 1100,
                "hospital": "Prime Bone Care",
            },


            # ---------------- DERMATOLOGY ----------------

            {
                "first_name": "Sneha",
                "last_name": "Patel",
                "specialization": "Dermatology",
                "qualification": "MBBS, MD Dermatology",
                "experience": 10,
                "fee": 600,
                "hospital": "SkinCare Hospital",
            },

            {
                "first_name": "Riya",
                "last_name": "Kapoor",
                "specialization": "Dermatology",
                "qualification": "MBBS, MD Dermatology",
                "experience": 8,
                "fee": 550,
                "hospital": "Glow Skin Centre",
            },

            {
                "first_name": "Nikita",
                "last_name": "Joshi",
                "specialization": "Dermatology",
                "qualification": "MBBS, DDVL",
                "experience": 12,
                "fee": 700,
                "hospital": "ClearSkin Clinic",
            },

            {
                "first_name": "Arjun",
                "last_name": "Shah",
                "specialization": "Dermatology",
                "qualification": "MBBS, MD",
                "experience": 15,
                "fee": 850,
                "hospital": "DermaCare Hospital",
            },

            {
                "first_name": "Kavita",
                "last_name": "More",
                "specialization": "Dermatology",
                "qualification": "MBBS, MD Dermatology",
                "experience": 9,
                "fee": 650,
                "hospital": "Healthy Skin Centre",
            },


            # ---------------- PEDIATRICS ----------------

            {
                "first_name": "Kavya",
                "last_name": "Reddy",
                "specialization": "Pediatrics",
                "qualification": "MBBS, MD Pediatrics",
                "experience": 8,
                "fee": 600,
                "hospital": "Children Care Hospital",
            },

            {
                "first_name": "Asha",
                "last_name": "Iyer",
                "specialization": "Pediatrics",
                "qualification": "MBBS, MD Pediatrics",
                "experience": 13,
                "fee": 700,
                "hospital": "Little Stars Hospital",
            },

            {
                "first_name": "Manish",
                "last_name": "Gupta",
                "specialization": "Pediatrics",
                "qualification": "MBBS, DCH",
                "experience": 11,
                "fee": 550,
                "hospital": "Child Health Centre",
            },

            {
                "first_name": "Divya",
                "last_name": "Menon",
                "specialization": "Pediatrics",
                "qualification": "MBBS, MD",
                "experience": 9,
                "fee": 650,
                "hospital": "Sunshine Children's Hospital",
            },

            {
                "first_name": "Nitin",
                "last_name": "Bhosale",
                "specialization": "Pediatrics",
                "qualification": "MBBS, MD Pediatrics",
                "experience": 17,
                "fee": 800,
                "hospital": "Care Kids Hospital",
            },


            # ---------------- GENERAL PHYSICIAN ----------------

            {
                "first_name": "Vikram",
                "last_name": "Singh",
                "specialization": "General Physician",
                "qualification": "MBBS, MD Medicine",
                "experience": 20,
                "fee": 500,
                "hospital": "General Health Hospital",
            },

            {
                "first_name": "Sunita",
                "last_name": "Desai",
                "specialization": "General Physician",
                "qualification": "MBBS, MD",
                "experience": 15,
                "fee": 450,
                "hospital": "Wellness Hospital",
            },

            {
                "first_name": "Akash",
                "last_name": "Chavan",
                "specialization": "General Physician",
                "qualification": "MBBS",
                "experience": 7,
                "fee": 350,
                "hospital": "City Medical Centre",
            },

            {
                "first_name": "Deepa",
                "last_name": "Mishra",
                "specialization": "General Physician",
                "qualification": "MBBS, MD Medicine",
                "experience": 12,
                "fee": 550,
                "hospital": "Health First Hospital",
            },

            {
                "first_name": "Mahesh",
                "last_name": "Kadam",
                "specialization": "General Physician",
                "qualification": "MBBS, MD",
                "experience": 18,
                "fee": 600,
                "hospital": "Prime Healthcare",
            },
        ]


        # --------------------------------------------------
        # Repeat the doctors until we reach 100
        # --------------------------------------------------

        base_count = len(doctors_data)

        for i in range(base_count, 100):

            base = doctors_data[i % base_count].copy()

            base["first_name"] = f"{base['first_name']}{i + 1}"
            base["last_name"] = base["last_name"]

            doctors_data.append(base)


        created_count = 0
        existing_count = 0

        with transaction.atomic():

            for index, data in enumerate(doctors_data, start=1):

                email = f"doctor{index}@medinova.com"

                # Check if doctor already exists
                if User.objects.filter(email=email).exists():

                    existing_count += 1
                    continue

                # ---------------- USER ----------------

                user = User.objects.create_user(
                    email=email,
                    password="Doctor@123",
                    role="DOCTOR",
                    first_name=data["first_name"],
                    last_name=data["last_name"],
                )

                # ---------------- DOCTOR PROFILE ----------------

                doctor = DoctorProfile.objects.create(
                    user=user,
                    specialization=data["specialization"],
                    qualification=data["qualification"],
                    experience=data["experience"],
                    consultation_fee=data["fee"],
                    hospital=data["hospital"],
                    license_number=f"MED-{2026}-{index:04d}",
                    biography=(
                        f"Dr. {data['first_name']} {data['last_name']} "
                        f"is an experienced {data['specialization']} "
                        f"specialist with {data['experience']} years "
                        f"of professional medical experience."
                    ),
                    available=True,
                )

                # ---------------- AVAILABILITY ----------------

                working_days = [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ]

                for day in working_days:

                    DoctorAvailability.objects.create(
                        doctor=doctor,
                        day=day,
                        start_time=time(9, 0),
                        end_time=time(17, 0),
                        available=True,
                    )

                created_count += 1


        self.stdout.write(
            self.style.SUCCESS(
                f"\nSuccessfully created {created_count} doctors."
            )
        )

        self.stdout.write(
            self.style.WARNING(
                f"Already existing doctors skipped: {existing_count}"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "\nAll demo doctors have password: Doctor@123"
            )
        )