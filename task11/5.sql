SELECT USER.NAME FROM twitter.POST inner join twitter.USER on POST.USER_ID=USER.USER_ID group by USER.USER_ID having count(USER.USER_ID)>=3;
