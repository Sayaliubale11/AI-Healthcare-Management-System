from datetime import datetime, timedelta


def generate_time_slots(start_time, end_time, interval=30):

    slots = []

    current = datetime.combine(datetime.today(), start_time)
    end = datetime.combine(datetime.today(), end_time)

    while current < end:

        slots.append(current.time())

        current += timedelta(minutes=interval)

    return slots