CREATE DATABASE IF NOT EXISTS providers_db;

USE providers_db;

CREATE TABLE IF NOT EXISTS providers (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    location POINT NOT NULL,
    overAllRating FLOAT NULL,
    SPATIAL INDEX (location)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS slots (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    provider_id BIGINT UNSIGNED NOT NULL,
    start_at DATETIME NOT NULL,
    end_at DATETIME NOT NULL,
    remaining INT UNSIGNED NOT NULL DEFAULT 1,
    KEY idx_provider (provider_id)
) ENGINE = InnoDB;