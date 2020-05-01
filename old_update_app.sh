#!/bin/bash

#This script updates the current version number in this React/Node/Mongo (MERN) app by whatever value you pass to the script and rebuilds the containers and pushes new images to txnexus repo.
#Script reads the current version from a file named 'curr_version' and stores the updated version value in it.
#Usage: ./update_app.sh

## bc package needed to perform math operations on numbers
rpm -q bc | grep 'not installed' && echo -e "bc (bash calculator) package is not installed. This script needs that, please install it.\n" && exit 1;

[ ! -f ./curr_versions ] && echo -e "Current versions file is not present. Aborting... \n" && exit 1;

# To find the current version in current directory in case everything gets messed up
# egrep -r --exclude-dir=.git "V[0-9].[0-9]"
#''|*[!-.0-9]*) echo "Please enter a integer or float value as argument to this script!!" && exit 1 ;;

web_curr_ver=$(cat curr_versions | grep -w web_version: | cut -d " " -f2)
backend_curr_ver=$(cat curr_versions | grep -w backend_version: | cut -d " " -f2)
mongo_curr_ver=$(cat curr_versions | grep -w mongo_version: | cut -d " " -f2)
#new_ver=$( echo "$curr_ver + $1" | bc)

for i in web_curr_ver backend_curr_ver mongo_curr_ver;
do
	case ${!i} in
	# condition to check for non-empty only numeric input
		''|*[!.0-9]*) echo -e "Current versions are not recorded in curr_versions file!! Please ensure all three versions are recorded in the file. Aborting... \n" && exit 1 ;;
	esac
done

echo ""

read -p "Enter new web image version (Leave blank if unchanged, current version is $web_curr_ver): " web_new_ver
read -p "Enter new backend image version (Leave blank if unchanged, current version is $backend_curr_ver): " backend_new_ver
read -p "Enter new mongo image version (Leave blank if unchanged, current version is $mongo_curr_ver): " mongo_new_ver

if [ -z $web_new_ver ] && [ -z $backend_new_ver ] && [ -z $mongo_new_ver ]
then
	echo -e "\nERROR: All three version values can't be empty. Don't waste the time of this script if you don't want to update any images -_- \n"
	exit 1
fi

new_vars=(web_new_ver backend_new_ver mongo_new_ver)
curr_vars=(web_curr_ver backend_curr_ver mongo_curr_ver)

# Check for non-numeric values
for i in $web_new_ver $backend_new_ver $mongo_new_ver;
do
	case $i in
		-) echo -e "\nPlease enter only integer or float values as argument to this script!!\n" && exit 1 ;;
		.) echo -e "\nPlease enter only integer or float values as argument to this script!!\n" && exit 1 ;;
	# condition to check for non-empty only numeric input
		[!.0-9]*) echo -e "Please enter a integer or float value for entered value=$i!!\n" && exit 1 ;;
		*) ;; #echo "Good value $i" ;;
	esac
done

for i in web backend mongo;
do
	new_ver="$i""_new_ver"
	curr_ver="$i""_curr_ver"
	if ! [ -z ${!new_ver} ];
	then
		if (( $(echo "${!curr_ver} >= ${!new_ver}" | bc -l) ));
		then
			echo -e "\nERROR: New version of any image cannot be less than or equal to the older version. Just leave the prompt blank if not updating any image. $i ${!curr_ver} ${!new_ver}  \n"
			exit 1
		fi
	fi
done


echo -e "\nOld web version: $web_curr_ver\nOld backend version: $backend_curr_ver\nOld Mongo version: $mongo_curr_ver\nNew web version: $web_new_ver\nNew backend version: $backend_new_ver\nNew Mongo version: $mongo_new_ver"

## Replacing old version with new version
for i in web backend mongo;
do
	new_ver="$i""_new_ver"
	curr_ver="$i""_curr_ver"
	# handling special case where for mongo, the dir name is db
	[ $i == 'mongo' ] && ( grep -rl --exclude-dir=.git "V${!curr_ver}" db/ | xargs sed -i "s/V${!curr_ver}/V${!new_ver}/g" ) || ( grep -rl --exclude-dir=.git "V${!curr_ver}" $i/ | xargs sed -i "s/V${!curr_ver}/V${!new_ver}/g" )
	temp_ver="$i""_version: "
	cp curr_versions prev_versions
	sed -i "s/$temp_ver${!curr_ver}/$temp_ver${!new_ver}/g" curr_versions
	sed -i "s/$i:v${!curr_ver}/$i:v${!new_ver}/g" docker-compose.yml
done

# Building the application
docker-compose up -d --build

# Skip non-changed images
[ -z web_new_ver ] || docker push partiks/sample_web:v${web_new_ver}
[ -z backend_new_ver ] || docker push partiks/sample_backend:v${backend_new_ver}
[ -z mongo_new_ver ] || docker push partiks/sample_mongo:v${mongo_new_ver}
