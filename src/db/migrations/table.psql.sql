-- Column: "lifeCycle".event."axoneNotification"
--axoneNotification:
-- Null: je dois aller chercher si le type d'événement est dans la liste des événements à notifier
-- True: je dois envoyer une notification
-- False: je ne dois pas envoyer de notification
--axoneNotificationSent:
-- True: j'ai envoyé une notification pour cet événement
-- False: je n'ai pas envoyé de notification
-- ALTER TABLE IF EXISTS "lifeCycle".event DROP COLUMN IF EXISTS "axoneaxoneNotificationSentSent";

CREATE TYPE axoneNotificationType AS ENUM('notVerified', 'canBeNotified', 'canNotBeNotified');

ALTER TABLE "lifeCycle"."event"
    ADD COLUMN "axoneNotification" axoneNotificationType DEFAULT 'notVerified';

ADD COLUMN "axoneNotificationSent" boolean DEFAULT false;
