# ---------- Builder: composer, php extensions and runtime ----------
FROM php:8.3-fpm AS php-base

# arguments (optional)
ARG WWWGROUP=1000
ARG WWWUSER=1000

ENV DEBIAN_FRONTEND=noninteractive \
    COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer

# Install system deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    zip \
    unzip \
    libpq-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    pkg-config \
    gnupg2 \
    dirmngr \
    wget \
    procps \
 && rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-jpeg --with-freetype --with-webp \
 && docker-php-ext-install -j$(nproc) gd pdo pdo_pgsql pgsql mbstring bcmath intl xml zip opcache

# Install redis extension via PECL (optional for session/cache)
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:2.9 /usr/bin/composer /usr/bin/composer

# Create system user for container (optional)
# RUN groupadd -g ${WWWGROUP} www && \
#     useradd -u ${WWWUSER} -ms /bin/bash -g www www
RUN groupadd --force -g $WWWGROUP sail
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 sail
RUN git config --global --add safe.directory /var/www/html

WORKDIR /var/www/html

# Copy only composer files first (cache)
COPY composer.json composer.lock /var/www/html/

# Copy rest of application
COPY . /var/www/html

# install PHP dependencies
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader --no-progress

# Ensure permissions
RUN chown -R www:www /var/www/html && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache || true

# Expose socket/port for php-fpm
EXPOSE 80/tcp

# Use the PHP-FPM entrypoint and run as www user
USER www
CMD ["php-fpm"]
